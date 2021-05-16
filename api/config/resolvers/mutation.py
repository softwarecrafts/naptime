from ariadne import MutationType

from api.naps.resolvers import NapResolver


mutation = MutationType()


class Mutation:

    # create_nap = NapResolver.create

    @mutation.field("createNap")
    def create_nap(obj, info, input):
        return NapResolver().create(obj, info, input)
