/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addAdvertisement = `mutation AddAdvertisement(
  $ADContent: String
  $ImageUrl: String
  $ProductDescription: String
  $ProductType: String!
  $RPMaxSharedNum: Int
  $RPMoneyInside: Float
  $RPMoneyToShare: Float
  $RPShareBonus: Float
) {
  addAdvertisement(
    ADContent: $ADContent
    ImageUrl: $ImageUrl
    ProductDescription: $ProductDescription
    ProductType: $ProductType
    RPMaxSharedNum: $RPMaxSharedNum
    RPMoneyInside: $RPMoneyInside
    RPMoneyToShare: $RPMoneyToShare
    RPShareBonus: $RPShareBonus
  ) {
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
export const openPrivateRedPacket = `mutation OpenPrivateRedPacket($ProductType: String!, $UserEmail: String!) {
  openPrivateRedPacket(ProductType: $ProductType, UserEmail: $UserEmail) {
    UserEmail
    Balance
    hasSharedRP
  }
}
`;
export const openSharedRedPacket = `mutation OpenSharedRedPacket(
  $FriendUserEmail: String
  $ProductType: String!
  $UserEmail: String!
) {
  openSharedRedPacket(
    FriendUserEmail: $FriendUserEmail
    ProductType: $ProductType
    UserEmail: $UserEmail
  ) {
    UserEmail
    ProductType
    RPShareDetails
    ScannedFlag
    SharedDoneFlag
    UpdateTime
  }
}
`;
export const shareRedPacket = `mutation ShareRedPacket($ProductType: String!, $UserEmail: String!) {
  shareRedPacket(ProductType: $ProductType, UserEmail: $UserEmail) {
    UserEmail
    ProductType
    RPShareDetails
    ScannedFlag
    SharedDoneFlag
    UpdateTime
  }
}
`;
export const createAdvertisement = `mutation CreateAdvertisement(
  $input: CreateAdvertisementInput!
  $condition: ModelAdvertisementConditionInput
) {
  createAdvertisement(input: $input, condition: $condition) {
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
export const updateAdvertisement = `mutation UpdateAdvertisement(
  $input: UpdateAdvertisementInput!
  $condition: ModelAdvertisementConditionInput
) {
  updateAdvertisement(input: $input, condition: $condition) {
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
export const deleteAdvertisement = `mutation DeleteAdvertisement(
  $input: DeleteAdvertisementInput!
  $condition: ModelAdvertisementConditionInput
) {
  deleteAdvertisement(input: $input, condition: $condition) {
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
export const createSharedRedPacket = `mutation CreateSharedRedPacket(
  $input: CreateSharedRedPacketInput!
  $condition: ModelSharedRedPacketConditionInput
) {
  createSharedRedPacket(input: $input, condition: $condition) {
    UserEmail
    ProductType
    RPShareDetails
    ScannedFlag
    SharedDoneFlag
    UpdateTime
  }
}
`;
export const updateSharedRedPacket = `mutation UpdateSharedRedPacket(
  $input: UpdateSharedRedPacketInput!
  $condition: ModelSharedRedPacketConditionInput
) {
  updateSharedRedPacket(input: $input, condition: $condition) {
    UserEmail
    ProductType
    RPShareDetails
    ScannedFlag
    SharedDoneFlag
    UpdateTime
  }
}
`;
export const deleteSharedRedPacket = `mutation DeleteSharedRedPacket(
  $input: DeleteSharedRedPacketInput!
  $condition: ModelSharedRedPacketConditionInput
) {
  deleteSharedRedPacket(input: $input, condition: $condition) {
    UserEmail
    ProductType
    RPShareDetails
    ScannedFlag
    SharedDoneFlag
    UpdateTime
  }
}
`;
export const createUser = `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    UserEmail
    Balance
    hasSharedRP
  }
}
`;
export const updateUser = `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    UserEmail
    Balance
    hasSharedRP
  }
}
`;
export const deleteUser = `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    UserEmail
    Balance
    hasSharedRP
  }
}
`;
