
from typing import Union
from unicodedata import name
from pydantic import BaseModel
from fastapi import FastAPI, Response, Cookie, HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime, timezone, timedelta
from fastapi.middleware.cors import CORSMiddleware
import utils.db as db
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

db_instance = db.get_db_connection()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "HEAD", "OPTIONS"],
    allow_headers=["Access-Control-Allow-Headers", 'Content-Type',
                   'Authorization', 'Access-Control-Allow-Origin'],
)


@app.post("/login")
async def login(login: Login):
    res = await userRepo.getUserUsingEmail(db_instance, login.email, login.password)

    if res[1]:
        raise HTTPException(status_code=400, detail="no user found")

    token = jwt.encode({
        "exp": datetime.now(tz=timezone.utc) + timedelta(minutes=30),
        "email": res[0][1],
        "name": res[0][0]
    }, secret)

    if token[1] == True:
        raise HTTPException(status_code=400, detail="token not generated")

    response = JSONResponse(content={
        "name": res[0][0],
        "email": res[0][1]
    })

    response.set_cookie(key="t", value=token[0], httponly=True, secure=True)

    return response


@ app.get("/verify")
def verify(t: Union[str, None] = Cookie(default=None)):
    if t == None:
        raise HTTPException(status_code=400, detail="cannot authenticate")

    d = jwt.decode(t, secret)

    if d[1] == True:
        raise HTTPException(status_code=400, detail="cannot authenticate")

    return {"status": True, "name": d[0]["name"], "email": d[0]["email"]}


@ app.post("/signup")
async def signUp(body: SignUp):

    res = await userRepo.addUser(db_instance, body.email, body.password, body.name)

    if res[1] == False:
        return {"status": True}

    else:
        return {"status": False}
