// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

// @author: Araya

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                       //
//                                                                                                                                       //
// oooooooooo.  ooooo          .oooooo.     .oooooo.   oooo    oooo ooooo   ooooo oooooooooooo       .o.       oooooooooo.    .oooooo..o //
// `888'   `Y8b `888'         d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  `888'   `888' `888'     `8      .888.      `888'   `Y8b  d8P'    `Y8 //
//  888     888  888         888      888 888           888  d8'     888     888   888             .8"888.      888      888 Y88bo.      //
//  888oooo888'  888         888      888 888           88888[       888ooooo888   888oooo8       .8' `888.     888      888  `"Y8888o.  //
//  888    `88b  888         888      888 888           888`88b.     888     888   888    "      .88ooo8888.    888      888      `"Y88b //
//  888    .88P  888       o `88b    d88' `88b    ooo   888  `88b.   888     888   888       o  .8'     `888.   888     d88' oo     .d8P //
// o888bood8P'  o888ooooood8  `Y8bood8P'   `Y8bood8P'  o888o  o888o o888o   o888o o888ooooood8 o88o     o8888o o888bood8P'   8""88888P'  //
//                                                                                                                                       //
//                                                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

contract BlockHeads is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    using Strings for uint256;

    uint256 public MAX_ELEMENTS = 9999;
    uint256 public PRICE = 0.15 ether;

    uint256 public saleTransLimit = 20; // Sale limit per transaction
    uint256 public mintLimit = 20; // mint limit per Wallet
    mapping(address => uint256) public mintListPurchases;

    Counters.Counter private _tokenIdTracker;

    string public baseTokenURI;

    bool public META_REVEAL = true;
    string public sampleTokenURI;

    bool public isAirdropStarted = false;
    bool public isPresaleStarted = false;
    bool public isPublicsaleStarted = false;

    constructor(string memory baseURI) ERC721("BLOCKHEADS", "BLOCKHEADS") {
        setBaseURI(baseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function totalToken() public view returns (uint256) {
        return _tokenIdTracker.current();
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (!META_REVEAL) return sampleTokenURI;

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    function mint(
        uint256 _tokenAmount,
        uint256 _timestamp,
        bytes memory _signature
    ) public payable {
        require(
            isPresaleStarted || isPublicsaleStarted,
            "Sale has not started yet."
        );
        require(!isAirdropStarted, "Airdrop is active yet.");
        uint256 total = totalToken();
        require(_tokenAmount <= saleTransLimit, "Max limit");
        require(total + _tokenAmount <= MAX_ELEMENTS, "Max limit");
        require(msg.value >= price(_tokenAmount), "Value below price");
        require(
            mintListPurchases[msg.sender] + _tokenAmount <= mintLimit,
            "Exceeded sale allowed buy limit"
        );

        address wallet = _msgSender();
        address signerOwner = signatureWallet(
            wallet,
            _tokenAmount,
            _timestamp,
            _signature
        );
        require(signerOwner == owner(), "Not authorized to mint");
        for (uint8 i = 1; i <= _tokenAmount; i++) {
            mintListPurchases[wallet]++;
            _mintAnElement(wallet, total + i);
        }
    }

    function claim(
        uint256 _tokenAmount,
        uint256 _timestamp,
        bytes memory _signature
    ) public {
        require(isAirdropStarted, "Airdrop is not active.");
        uint256 total = totalToken();
        require(total + _tokenAmount <= MAX_ELEMENTS, "Max limit");

        address wallet = _msgSender();

        address signerOwner = signatureWallet(
            wallet,
            _tokenAmount,
            _timestamp,
            _signature
        );
        require(signerOwner == owner(), "Not authorized to claim");

        for (uint8 i = 1; i <= _tokenAmount; i++) {
            _mintAnElement(wallet, total + i);
        }
    }

    function signatureWallet(
        address wallet,
        uint256 _tokenAmount,
        uint256 _timestamp,
        bytes memory _signature
    ) public pure returns (address) {
        return
            ECDSA.recover(
                keccak256(abi.encode(wallet, _tokenAmount, _timestamp)),
                _signature
            );
    }

    function _mintAnElement(address _to, uint256 _tokenId) private {
        _tokenIdTracker.increment();
        _safeMint(_to, _tokenId);
    }

    function price(uint256 _count) public view returns (uint256) {
        return PRICE.mul(_count);
    }

    function walletOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    /**
     *   ██████  ██     ██ ███    ██ ███████ ██████
     *  ██    ██ ██     ██ ████   ██ ██      ██   ██
     *  ██    ██ ██  █  ██ ██ ██  ██ █████   ██████
     *  ██    ██ ██ ███ ██ ██  ██ ██ ██      ██   ██
     *   ██████   ███ ███  ██   ████ ███████ ██   ██
     * This section will have all the internals set to onlyOwner
     */

    function setBaseURI(string memory baseURI) public onlyOwner {
        baseTokenURI = baseURI;
    }

    function setSampleURI(string memory sampleURI) public onlyOwner {
        sampleTokenURI = sampleURI;
    }

    function setPrice(uint256 _price) public onlyOwner {
        PRICE = _price;
    }

    function toggleReveal() public onlyOwner {
        META_REVEAL = !META_REVEAL;
    }

    function togglePresale() public onlyOwner {
        isPresaleStarted = !isPresaleStarted;
    }

    function togglePublicSale() public onlyOwner {
        isPublicsaleStarted = !isPublicsaleStarted;
    }

    function toggleAirdropStatus() public onlyOwner {
        isAirdropStarted = !isAirdropStarted;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function giftMint(address[] memory _addrs, uint256[] memory _tokenAmounts)
        public
        onlyOwner
    {
        uint256 totalQuantity = 0;
        uint256 total = totalToken();
        for (uint256 i = 0; i < _addrs.length; i++) {
            totalQuantity += _tokenAmounts[i];
        }
        require(total + totalQuantity <= MAX_ELEMENTS, "Max limit");
        for (uint256 i = 0; i < _addrs.length; i++) {
            for (uint256 j = 0; j < _tokenAmounts[i]; j++) {
                total++;
                _mintAnElement(_addrs[i], total);
            }
        }
    }
}
