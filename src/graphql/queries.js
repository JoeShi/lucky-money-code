/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBalanceRanking = `query GetBalanceRanking($Limit: Int) {
  getBalanceRanking(Limit: $Limit) {
    UserEmail
    Balance
    hasSharedRP
  }
}
`;
export const getFriends = `query GetFriends($UserEmail: String!) {
  getFriends(UserEmail: $UserEmail) {
    UserEmail
    Balance
    hasSharedRP
  }
}
`;
export const getSharedRedPacketsByUser = `query GetSharedRedPacketsByUser($UserEmail: String!) {
  getSharedRedPacketsByUser(UserEmail: $UserEmail) {
    UserEmail
    ProductType
    RPShareDetails
    ScannedFlag
    SharedDoneFlag
    UpdateTime
  }
}
`;
export const getAdvertisement = `query GetAdvertisement($ProductType: Int!) {
  getAdvertisement(ProductType: $ProductType) {
    ProductType
    ADContent
    ImageUrl
    ProductDescription
    RPMaxSharedNum
    RPMoneyInside
    RPMoneyToShare
    RPShareBonus
  }
}
`;
export const listAdvertisements = `query ListAdvertisements(
  $ProductType: Int
  $filter: ModelAdvertisementFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listAdvertisements(
    ProductType: $ProductType
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      ProductType
      ADContent
      ImageUrl
      ProductDescription
      RPMaxSharedNum
      RPMoneyInside
      RPMoneyToShare
      RPShareBonus
    }
    nextToken
  }
}
`;
export const getSharedRedPacket = `query GetSharedRedPacket($UserEmail: String!, $ProductType: Int!) {
  getSharedRedPacket(UserEmail: $UserEmail, ProductType: $ProductType) {
    UserEmail
    ProductType
    RPShareDetails
    ScannedFlag
    SharedDoneFlag
    UpdateTime
  }
}
`;
export const listSharedRedPackets = `query ListSharedRedPackets(
  $UserEmail: String
  $ProductType: ModelIntKeyConditionInput
  $filter: ModelSharedRedPacketFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listSharedRedPackets(
    UserEmail: $UserEmail
    ProductType: $ProductType
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      UserEmail
      ProductType
      RPShareDetails
      ScannedFlag
      SharedDoneFlag
      UpdateTime
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($UserEmail: String!) {
  getUser(UserEmail: $UserEmail) {
    UserEmail
    Balance
    hasSharedRP
  }
}
`;
export const listUsers = `query ListUsers(
  $UserEmail: String
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    UserEmail: $UserEmail
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      UserEmail
      Balance
      hasSharedRP
    }
    nextToken
  }
}
`;
