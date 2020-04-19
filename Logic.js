function GetLandData() {
   

  var GenesisPlotOwners = [];
  var GenLeaders = [];

  var url = "https://axieinfinity.com/graphql-server/graphql"
  var col = -30;
  var row = 30;
  var i = 0;
  var y = 0;

  while (i < 82) {
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
      try {       //catches the error if there is either a street or no land owner account
        text = data.data.land.ownerProfile.name;
        if(text == null) {
          text = data.data.land.owner;
        } 

        if(text != "Invalid") {
          GenesisPlotOwners.push(text);
        } 
      }
      catch {
        text = "Non-Registered Users";
        GenesisPlotOwners.push(text);
      }
      console.log(GenesisPlotOwners);
      console.log("entire data:", data);

      if(y == 81) {

        GenesisPlotOwners.sort();

        for(d=0; d < 7; d++){     // Deletes the street plots between the Genesis plots
          const index = GenesisPlotOwners.indexOf("Non-Registered Users");
          if (index > -1) {
            GenesisPlotOwners.splice(index, 1);
          }
        }

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

        document.getElementById('GList').innerHTML = '<ol id="GL">' + GenLeaders.map(function (genesis) {
            return '<li>' + String(genesis["amount"]) + " Genesis Plot(s) owned by " + String(genesis["owner"]) + '</li>';
        }).join('') + '</ol>';
        console.log(GenLeaders);
      }
      console.log(y);
      y++;
    });
    if(row > -30) {
      row = row - 1;
    } else if(col < -9) {
      col = col + 1;
    }
    console.log(row, col);
    i++;
  }  
}

function Switcheru(){
  var x = document.getElementById("GenesisMapBox");
  var s = document.getElementById("GenesisOwnersButton");
  if(x.style.display === "none") {
    x.style.display = "block";
    s.style.display = "none";
  } else {
    x.style.display = "none";
    s.style.display = "block";
  }
}

function Scale(){
  var x = document.getElementById("ScaleButton");
  var s = document.getElementById("GenesisOwnersSizer");
  if(x.innerHTML === "Zoom In") {
    x.innerHTML = "Zoom Out";
    s.style.transform = "scale(0.25)";
  } else {
    x.innerHTML = "Zoom In";
    s.style.transform = "scale(1)";
    
  }
}

//Testbed code:
function GetLandData2() {
   

  var GenesisPlotOwners = [];
  var GenLeaders = [];

  var url = "https://axieinfinity.com/graphql-server/graphql"
  var col = -35;
  var row = -8;
  var i = 0;
  var y = 0;

  
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

      

      console.log(GenesisPlotOwners);
      console.log("entire data:", data);

      
    
    console.log(row, col);
    });
  
}
