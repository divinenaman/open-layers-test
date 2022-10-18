
from typing import Union
from unicodedata import name
from pydantic import BaseModel
from fastapi import FastAPI, Response, Cookie
from datetime import datetime, timezone, timedelta

import repo.user as userRepo
import utils.jwt as jwt

app = FastAPI()


class Login(BaseModel):
    email: str
    password: str


class SignUp(BaseModel):
    email: str
    password: str
    name: str


secret = "secret"


@app.post("/login")
async def login(login: Login, response: Response):
    res = await userRepo.getUserUsingEmail(login.email, login.password)

    token = jwt.encode({
        "exp": datetime.now(tz=timezone.utc) + timedelta(minutes=30),
        "email": res["email"],
        "name": res["name"]
    }, secret)

    if token["error"] == True:
        return {"status": False}

    response.set_cookie(key="t", value=token["payload"])

    return res


@ app.post("/verify")
def verify(t: Union[str, None]=Cookie(default=None)):
    if t == None:
        return {"status": False}

    d = jwt.decode(t, secret)

    if d["error"] == False:
        return {"status": True}

    else:
        return {"status": False}


@ app.post("/signUp")
async def signUp(body: SignUp):

    res = await userRepo.addUser(body.email, body.password, body.name)

    if res['error'] == False:
        return {"status": True}

    else:
        return {"status": False}
