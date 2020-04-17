function GetLandData() {
   

  var GenesisPlotOwners = [];
  var GenLeaders = [];

  var url = "https://axieinfinity.com/graphql-server/graphql"
  var col = -30;
  var row = 30;
  var i = 0;
  var y = 0;

  while (i < 61) {
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
        query: "query GetLandDetail($col: Int!, $row: Int!) {   land(col: $col, row: $row) {     ...LandDetail     __typename   } }  fragment LandDetail on Land {   realTokenId   owner   landType   row   col   bundles   auction {     ...AxieAuction     __typename   }   offers {     ...OfferDetail     __typename   }   ownerProfile {     name     __typename   }   __typename }  fragment AxieAuction on Auction {   startingPrice   endingPrice   startingTimestamp   endingTimestamp   duration   timeLeft   currentPrice   currentPriceUSD   suggestedPrice   seller   listingIndex   auctionType   __typename }  fragment OfferDetail on Offer {   offerer {     ...ProfileBrief     __typename   }   listingIndex   price   createdAt   __typename }  fragment ProfileBrief on AccountProfile {   accountId   addresses {     ...Addresses     __typename   }   email   name   __typename }  fragment Addresses on NetAddresses {   ethereum   tomo   loom   __typename } "
      })
    })
    .then(function(response) { 
      return response.json(); 
    })

    .then(function(data) {

      var text = "Invalid";
      text = data.data.land.ownerProfile.name;
      if(text == null) {
        text = data.data.land.owner;
      } 

      if(text != "Invalid") {
        GenesisPlotOwners.push(text);
      }

      console.log(GenesisPlotOwners);
      console.log("entire data:", data);

      if(y == 52) {

        GenesisPlotOwners.sort();

        var current = null;
        var cnt = 0;
        for (var i = 0; i < GenesisPlotOwners.length; i++) {
            if (GenesisPlotOwners[i] != current) {
                if (cnt > 0) {

                    GenLeaders.push({amount : cnt, owner : current});
                }
                current = GenesisPlotOwners[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            GenLeaders.push({amount : cnt, owner : current});
        }

        GenLeaders.sort((a,b) => b.amount - a.amount || a.owner - b.owner);

        document.getElementById('GList').innerHTML = '<ol>' + GenLeaders.map(function (genesis) {
            return '<li>' + String(genesis["amount"]) + " Genesis Plots owned by " + String(genesis["owner"]) + '</li>';
        }).join('') + '</ol>';
        console.log(GenLeaders);
      }
      console.log(y);
      y++;
    });

    row = row - 1;
    i++;
  }



/*  Important for later
    var ol = document.getElementById("GenesisLeaderList");

    for( var i = 0; i < data.length; i++ )
    { 
       var o = data[i];
       var li = document.createElement("li");
       li.appendChild(document.createTextNode(o.title));
       ol.appendChild(li);    
    }                   
 */
/*
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
      query: "query GetLandDetail($col: Int!, $row: Int!) {   land(col: $col, row: $row) {     ...LandDetail     __typename   } }  fragment LandDetail on Land {   realTokenId   owner   landType   row   col   bundles   auction {     ...AxieAuction     __typename   }   offers {     ...OfferDetail     __typename   }   ownerProfile {     name     __typename   }   __typename }  fragment AxieAuction on Auction {   startingPrice   endingPrice   startingTimestamp   endingTimestamp   duration   timeLeft   currentPrice   currentPriceUSD   suggestedPrice   seller   listingIndex   auctionType   __typename }  fragment OfferDetail on Offer {   offerer {     ...ProfileBrief     __typename   }   listingIndex   price   createdAt   __typename }  fragment ProfileBrief on AccountProfile {   accountId   addresses {     ...Addresses     __typename   }   email   name   __typename }  fragment Addresses on NetAddresses {   ethereum   tomo   loom   __typename } "
    })
  })
  .then(r => r.json())
  .then(data => console.log("data returned:", data));
*/


  //https://axieinfinity.com/marketplace-api/query-land?row=-30&col=-22

}


