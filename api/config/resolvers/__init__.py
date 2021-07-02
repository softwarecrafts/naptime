from ariadne.contrib.django.scalars import date_scalar, datetime_scalar, time_scalar

from api._core.resolvers import ObjectRegistry

from .query import query
from .mutation import mutation

objects = ObjectRegistry.object_types()
scalars = [date_scalar, datetime_scalar, time_scalar]
