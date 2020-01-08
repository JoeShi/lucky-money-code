/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBalanceRanking = `query GetBalanceRanking($Limit: Int) {
  getBalanceRanking(Limit: $Limit) {
    UserEmail
    Balance
    HasSharedRP
    Group
  }
}
`;
export const getFriends = `query GetFriends($UserEmail: String!) {
  getFriends(UserEmail: $UserEmail) {
    UserEmail
    Balance
    HasSharedRP
    Group
  }
}
`;
export const getSharedRedPacketsByUser = `query GetSharedRedPacketsByUser($UserEmail: String!) {
  getSharedRedPacketsByUser(UserEmail: $UserEmail) {
    UserEmail
    ProductType
    RPShareDetails
    SharedDoneFlag
    UpdateTime
  }
}
`;
export const getAdvertisement = `query GetAdvertisement($ProductType: String!) {
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
  $ProductType: String
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
export const getSharedRedPacket = `query GetSharedRedPacket($UserEmail: String!, $ProductType: String!) {
  getSharedRedPacket(UserEmail: $UserEmail, ProductType: $ProductType) {
    UserEmail
    ProductType
    RPShareDetails
    SharedDoneFlag
    UpdateTime
  }
}
`;
export const listSharedRedPackets = `query ListSharedRedPackets(
  $UserEmail: String
  $ProductType: ModelStringKeyConditionInput
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
    HasSharedRP
    Group
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
      HasSharedRP
      Group
    }
    nextToken
  }
}
`;
export const redPacketsByProductType = `query RedPacketsByProductType(
  $ProductType: String
  $sortDirection: ModelSortDirection
  $filter: ModelSharedRedPacketFilterInput
  $limit: Int
  $nextToken: String
) {
  redPacketsByProductType(
    ProductType: $ProductType
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      UserEmail
      ProductType
      RPShareDetails
      SharedDoneFlag
      UpdateTime
    }
    nextToken
  }
}
`;
export const usersByBalance = `query UsersByBalance(
  $Group: String
  $Balance: ModelFloatKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  usersByBalance(
    Group: $Group
    Balance: $Balance
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      UserEmail
      Balance
      HasSharedRP
      Group
    }
    nextToken
  }
}
`;
