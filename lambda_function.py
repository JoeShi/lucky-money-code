type Advertisement @model(mutations: null, subscriptions: null) @key(fields: ["id"]){
  id: String!
  description: String
}

type User @model(mutations: null) 
@key(fields: ["email"]) 
@key(name: "ByRanking", fields: ["balance"], queryField: "usersByBalance"){
  email: String!
  balance: Float!
  hasSharedRP: Boolean
  city: String
}

type SharedRedPacket @model{
  id: ID!
  userEmail: String!
  value: Float!
  remaining: Float
  SharedDetails: [SharedDetail]
  sharedDoneFlag: Boolean
}

type SharedDetail {
  userEmail: String!
  value: Float!
}

type Mutation {
  openPrivateRP(userEmail: String!, productID: String!): SharedRedPacket! @function(name: "LuckyMoneyFunction-${env}")
  openSharedRedPacket(userEmail: String!, productID: String!): SharedRedPacket! @function(name: "LuckyMoneyFunction-${env}")
  shareRedPacket(userEmail: String!, productID: String!): SharedRedPacket! @function(name: "LuckyMoneyFunction-${env}")
}

