from ServerConfig import databaseconfig
import sys,os

os.system(f'flask-sqlacodegen "mysql://{databaseconfig["user_password"]}@{databaseconfig["ip_port"]}/{databaseconfig["databasename"]}"  --outfile "./database/models.py" --flask')
