/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const openPrivateRedPacket = `mutation OpenPrivateRedPacket($ProductType: String!, $UserEmail: String!) {
  openPrivateRedPacket(ProductType: $ProductType, UserEmail: $UserEmail) {
    UserEmail
    Balance
    HasSharedRP
    Group
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
