pragma solidity  ^0.7.0; 
pragma experimental ABIEncoderV2; // ABI Encoder 

contract CustomerTab {
    
    constructor() { owner = msg.sender; }
    
    address owner; 
    
    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    struct Sale {
        uint256 timeOfSale;
        string itemID; 
        uint64 price; 
    }
    
    mapping(address => Sale[]) customerToSales;
    
    event ItemSold(
        uint256 unixTime, 
        string itemID, 
        uint64 price, 
        address indexed customerPubkey
        ); 
        
    event ItemPaid( 
        uint256 unixTime, 
        string itemID, 
        uint64 price, 
        address indexed customerPubkey
        );
        
    function addSaleForCustomer(address _customerPubkey, string calldata _itemID, uint64 _price) external { 
     Sale[] storage sales = customerToSales[_customerPubkey];
     uint256 _unixTime = block.timestamp; 
     sales.push(Sale(_unixTime, _itemID, _price));
     emit ItemSold(_unixTime, _itemID, _price, _customerPubkey);
        
    }
    
    function getTabForCustomer(address _customerPubkey) external view returns (Sale[] memory) { 
        return customerToSales[_customerPubkey];
    }
    
    function resetTab(address _customerPubkey) external onlyOwner {
    Sale[] storage sales = customerToSales[_customerPubkey]; 
    uint256 numItems = sales.length; 
    if (numItems > 0) {
        for (uint256 ii = 0; ii < sales.length; ii++) {
            sales.pop();
            }
        emit ItemPaid(block.timestamp, "", 0, _customerPubkey);
        }
    }
    
    function itemPaidByCustomer(address _customerPubkey, string calldata _itemID) external onlyOwner {
        Sale[] storage items = customerToSales[_customerPubkey];
        uint256 numItems = items.length;
        for (uint256 ii = 0; ii < numItems; ii++) {
            
            Sale memory thisItem = items[ii];
            
            if (keccak256(bytes(thisItem.itemID)) == keccak256(bytes(_itemID))) { 
                emit ItemPaid(block.timestamp, thisItem.itemID, thisItem.price, _customerPubkey);
        }
            if (numItems > 1) {
                items[ii] = items[numItems -1]; 
                items.pop();
            break;
              }
           }
        }
}

