/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAdvertisement = `subscription OnCreateAdvertisement {
  onCreateAdvertisement {
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
export const onUpdateAdvertisement = `subscription OnUpdateAdvertisement {
  onUpdateAdvertisement {
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
export const onDeleteAdvertisement = `subscription OnDeleteAdvertisement {
  onDeleteAdvertisement {
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
export const onCreateSharedRedPacket = `subscription OnCreateSharedRedPacket {
  onCreateSharedRedPacket {
    UserEmail
    ProductType
    RPShareDetails
    ScannedFlag
    SharedDoneFlag
    UpdateTime
  }
}
`;
export const onUpdateSharedRedPacket = `subscription OnUpdateSharedRedPacket {
  onUpdateSharedRedPacket {
    UserEmail
    ProductType
    RPShareDetails
    ScannedFlag
    SharedDoneFlag
    UpdateTime
  }
}
`;
export const onDeleteSharedRedPacket = `subscription OnDeleteSharedRedPacket {
  onDeleteSharedRedPacket {
    UserEmail
    ProductType
    RPShareDetails
    ScannedFlag
    SharedDoneFlag
    UpdateTime
  }
}
`;
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    UserEmail
    Balance
    hasSharedRP
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    UserEmail
    Balance
    hasSharedRP
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    UserEmail
    Balance
    hasSharedRP
  }
}
`;
