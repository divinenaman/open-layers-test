
async def getUserUsingEmail(db, email, password):
    mycursor = db.cursor()

    sql = "SELECT name, email FROM login WHERE email = %s AND password = %s"
    val = (email, password)
    mycursor.execute(sql, val)

    myresult = mycursor.fetchone()

    if myresult == None:
        return (None, True)

    return (myresult , False)

async def addUser(db, email, password, name):

    mycursor = db.cursor()

    sql = "INSERT INTO login (name, email, password) VALUES (%s, %s, %s)"
    val = (name, email, password)
    mycursor.execute(sql, val)

    db.commit()

    err = mycursor.rowcount > 0
    return (None, err)
    