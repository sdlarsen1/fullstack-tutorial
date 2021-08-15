const { gql } = require('apollo-server');

const typeDefs = gql`
    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type User {
        id: ID!
        email: String!
        trips: [Launch]!
        token: String
    }

    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }

    enum PatchSize {
        SMALL
        LARGE
    }

    type Query {
        launches(
            pageSize: Int # The number of results to show. Must be >= 1. Default = 20
            after: String
        ): LaunchConnection!
        launch(id: ID!): Launch
        me: User
    }

    """
    Simple wrapper around our list of launches that contains a cursor to thelast item in the list.
    Pass this cursor to the launches query to fetch resultsafter these.
    """
    type LaunchConnection {
        cursor: String!
        hasMore: Boolean!
        launches: [Launch]!
    }

    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String): User
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }
`;

module.exports = typeDefs;
