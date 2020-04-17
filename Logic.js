function GetLandData() {
   
    var url = "https://axieinfinity.com/graphql-server/graphql"
    var col = -109;
    var row = -109;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      operationName : "GetLandDetail",
      variables: { 
        row, 
        col,
      },
      query: "query GetLandDetail($col: Int!, $row: Int!) {↵  land(col: $col, row: $row) {↵    ...LandDetail↵    __typename↵  }↵}↵↵fragment LandDetail on Land {↵  realTokenId↵  owner↵  landType↵  row↵  col↵  bundles↵  auction {↵    ...AxieAuction↵    __typename↵  }↵  offers {↵    ...OfferDetail↵    __typename↵  }↵  ownerProfile {↵    name↵    __typename↵  }↵  __typename↵}↵↵fragment AxieAuction on Auction {↵  startingPrice↵  endingPrice↵  startingTimestamp↵  endingTimestamp↵  duration↵  timeLeft↵  currentPrice↵  currentPriceUSD↵  suggestedPrice↵  seller↵  listingIndex↵  auctionType↵  __typename↵}↵↵fragment OfferDetail on Offer {↵  offerer {↵    ...ProfileBrief↵    __typename↵  }↵  listingIndex↵  price↵  createdAt↵  __typename↵}↵↵fragment ProfileBrief on AccountProfile {↵  accountId↵  addresses {↵    ...Addresses↵    __typename↵  }↵  email↵  name↵  __typename↵}↵↵fragment Addresses on NetAddresses {↵  ethereum↵  tomo↵  loom↵  __typename↵}↵"
    })
  })
  .then(r => r.json())
  .then(data => console.log("data returned:", data));



  //https://axieinfinity.com/marketplace-api/query-land?row=-30&col=-22

}
