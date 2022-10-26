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
        return (t, False)

    except Exception as e:
        return (None, True)


def decode(s, secret):

    try:
        res = jwt.decode(s, secret, algorithms=["HS256"])
        return (res, False)

    except jwt.ExpiredSignatureError:
        return (None, True)