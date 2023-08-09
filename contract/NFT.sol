// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Contract is ERC1155, Ownable
{
    // 7 nfts
    uint[] private nft_ids = [1, 2, 3, 4, 5, 6, 7];
    // amount of each nft to mint
    uint[] private nft_amounts = [1, 1, 1, 1, 1, 1, 1];
    // amount of each nft that was transfered
    mapping(uint256 => uint256) private amounts_transfered;

    struct NFTUsage {
        uint256 id;
        bool used; // true = used, false = not used; default = false
    }

    mapping(address => NFTUsage[]) UsagePerUser;

    address public the_owner = 0x619E5b16bCc8b73aBAE24A57968FFFe9Ad21f374;
    string public baseURI = "ipfs://bafybeie7yqpchw4zopjn7khknnhvyfc454vk2w5zomgddite52kl3rvqtm/";
    string public baseExtension = ".json";

    constructor() ERC1155("")
    {
        _mintBatch(the_owner, nft_ids, nft_amounts, "");
        // initialize amounts_transfered
        for (uint256 i = 0; i < nft_ids.length; i++)
        {
            amounts_transfered[nft_ids[i]] = 0;
        }
    }

    function setAmounts(uint256[] memory _amounts) public onlyOwner
    {
        require(_amounts.length == nft_ids.length, "Amounts length must be equal to nft_ids length");
        for (uint256 i = 0; i < nft_ids.length; i++)
        {
            nft_amounts[i] = _amounts[i];
        }
    }

    // return Initial baseURI
    function _baseURI() internal view virtual returns (string memory) {
        return baseURI;
    }

    // set baseURI
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function uri(uint256 _tokenid) override public view returns (string memory)
    {
        return string(
            abi.encodePacked(
                baseURI,
                Strings.toString(_tokenid),
                baseExtension
            )
        );
    }

    // check if user has collected NFT
    function checkHasNFT(address _user, uint256 _id) public view returns (bool)
    {
        for (uint256 i = 0; i < UsagePerUser[_user].length; i++)
        {
            if (UsagePerUser[_user][i].id == _id)
            {
                return true;
            }
        }
        return false;
    }

    // Verificar quantas NFTS ainda não foram coletadas (transferidas)
    function checkAvailableNFT(uint256 _id) public view returns (uint256)
    {
        uint256 count = 0;
        // find the id index on nft_ids
        uint256 index = 0;
        for (uint256 i = 0; i < nft_ids.length; i++)
        {
            if (nft_ids[i] == _id)
            {
                index = i;
                break;
            }
        }
        // check how many nfts are available
        count = nft_amounts[index] - amounts_transfered[_id];

        return count;
    }

    // Verificar NFTs Totais
    function checkTotalNFTs(uint256 _id) public view returns (uint256)
    {
        // find the id index on nft_ids
        uint256 index = 0;
        for (uint256 i = 0; i < nft_ids.length; i++)
        {
            if (nft_ids[i] == _id)
            {
                index = i;
                break;
            }
        }

        return nft_amounts[index];
    }

    // Coletar NFT para usuário (transferir pre mintado)
    function collectNFT(address _user, uint256 _id) public onlyOwner
    {
        require(checkHasNFT(_user, _id) == false, "User already has this NFT");
        require(checkAvailableNFT(_id) > 0, "No more NFTs available");

        // transfer nft
        _safeTransferFrom(the_owner, _user, _id, 1, "");

        // update amounts_transfered
        amounts_transfered[_id] += 1;

        // update UsagePerUser
        UsagePerUser[_user].push(NFTUsage(_id, false));
    }

    // Check if user has used NFT
    function checkUsedNFT(address _user, uint256 _id) public view returns (bool)
    {
        for (uint256 i = 0; i < UsagePerUser[_user].length; i++)
        {
            if (UsagePerUser[_user][i].id == _id)
            {
                return UsagePerUser[_user][i].used;
            }
        }
        return false;
    }

    // use NFT
    function useNFT(address _user, uint256 _id) public onlyOwner
    {
        require(checkHasNFT(_user, _id) == true, "User does not have this NFT");
        require(checkUsedNFT(_user, _id) == false, "User already used this NFT");

        // update UsagePerUser
        for (uint256 i = 0; i < UsagePerUser[_user].length; i++)
        {
            if (UsagePerUser[_user][i].id == _id)
            {
                UsagePerUser[_user][i].used = true;
                break;
            }
        }
    }

    // burn NFT from user
    function burnNFT(address _user, uint256 _id) public onlyOwner
    {
        require(checkHasNFT(_user, _id) == true, "User does not have this NFT");

        // burn nft
        _burn(_user, _id, 1);

        // update UsagePerUser
        for (uint256 i = 0; i < UsagePerUser[_user].length; i++)
        {
            if (UsagePerUser[_user][i].id == _id)
            {
                delete UsagePerUser[_user][i];
                break;
            }
        }
    }
}
