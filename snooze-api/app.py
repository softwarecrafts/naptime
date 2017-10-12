# from flask import Flask
# from flask_restful import Api
# from flask_appconfig import AppConfig
# from flask_sqlalchemy import SQLAlchemy
# 
# import os
# 
# basedir = os.path.abspath(os.path.dirname(__file__))
# 
# app = Flask('snooze-api')
# app = Flask(__name__.split('.')[0])
# api = Api(app)
# AppConfig(app, os.path.join(basedir, 'default_config.py'))
# db = SQLAlchemy(app)
# 
# from . import models
# from .views import  donotdisturb


from chalice import Chalice, Cron
from api.backend.slack import DoNotDisturb

app = Chalice(app_name='snooze-api')


@app.route('/')
def index():
    return {'hello': 'world'}


@app.schedule(Cron(0, 2, '?', '*', 'THU', '*'))
def journey_snooze(event):
    hours = 24
    minutes = hours * 60
    DoNotDisturb().set_snooze(minutes)