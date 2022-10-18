import secrets
import jwt


class jwt_payload:
    def __init__(self, exp, name, email):
        self.exp = exp
        self.name = name,
        self.email = email


def encode(payload, secret):
    try:
        t = jwt.encode(payload, secret, algorithm='HS256')
        return {"error": False, "payload": t}

    except Exception as e:
        return {"error": True}


def decode(s, secret):

    try:
        res = jwt.decode(s, secret, algorithms=["HS256"])
        return {"error": False, "payload": res}

    except jwt.ExpiredSignatureError:
        return {"error": True}