import mysql.connector

def get_db_connection():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="open-layers",
        port="3306"
    )

    return mydb