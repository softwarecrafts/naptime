from flask import Flask
from flask_restful import Api
from flask_appconfig import AppConfig
from flask_sqlalchemy import SQLAlchemy

import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask('snooze-api')
app = Flask(__name__.split('.')[0])
api = Api(app)
AppConfig(app, os.path.join(basedir, 'default_config.py'))
db = SQLAlchemy(app)

from . import models
from .views import  donotdisturb