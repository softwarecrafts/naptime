# -*- coding: utf-8 -*-
from flask import jsonify, request, abort
from flask_restful import Resource

from ..app import api
from ..backend import slack
from ..constants import SUCCESS_REQUEST

import maya


class DoNotDisturbAPI(Resource):

    def __init__(self):
        """
        Endpoint for settings the Do Not Disturb on Slack.

        Attributes
        ----------
        """

    def get(self):
        """
        Get the DND status for the user

        Returns
        -------
        _ : JSON
            Request answer
        """
        # Get the dataframe with the sample
        results = slack.DoNotDisturb().get_dnd()

        response = {'results': results,
                    'status': SUCCESS_REQUEST,
                    'method': 'GET',
                    'uri': '/api/v1/dnd'}

        return jsonify(response)

    def post(self):
        """
        Set the DND status for a user
        """
        minutes = request.form.get('minutes')
        results = slack.DoNotDisturb().set_snooze(minutes)

        response = {'results': results,
                    'status': SUCCESS_REQUEST,
                    'method': 'POST',
                    'uri': '/api/v1/dnd'}
        return jsonify(response)


api.add_resource(DoNotDisturbAPI, '/api/v1/dnd', endpoint='dnd')
