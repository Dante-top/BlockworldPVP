import { ethers } from 'ethers';

export const mintNft = async (price, tokenAmount, timestamp, signature, address) => {
    try {
        const { ethereum } = window
        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            const BlockHeads = require("./BlockHeads.json");
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                BlockHeads.abi,
                signer
            )

            let e;
            try {
                console.log('mintPrice :', price);
                var correctPrice = ethers.BigNumber.from(price)
            } catch (u) {
                console.log('err', u);
            }
            let total;
            try {
                total = await contract.totalToken();
                var max_limit = 9999;
                console.log('total: ', parseInt(total));
                if (parseInt(total + tokenAmount) > max_limit) {
                    return { success: false, type: 'maxLimit' }
                }
            } catch (err) {
                console.log(err);
            }
            try {
                e = await contract.estimateGas.mint(tokenAmount, timestamp, signature, {
                    value: correctPrice.mul(tokenAmount),
                    from: address
                });
            } catch (err) {
                let error = JSON.parse(JSON.stringify(err));
                const errorMessage = error.error.message;
                if (errorMessage.includes('Exceeded sale allowed buy limit')) {
                    return { success: false, type: 'SaleLimit' }
                } else {
                    return { success: false, type: 'estimategas' }
                }
            }
            let d = await provider.getGasPrice();
            let nftTx;
            let tx

            try {
                nftTx = await contract.mint(tokenAmount, timestamp, signature, {
                    from: address,
                    gasLimit: parseInt(e),
                    gasPrice: parseInt(1.2 * d),
                    value: correctPrice.mul(tokenAmount),
                    maxFeePerGas: null,
                });
                tx = await nftTx.wait()
            } catch (u) {
                return { success: false, type: "mint" };
            }

            if (tx.status == 1) {
                return { success: true, type: "mint" };
            } else {
                return { success: false, type: "mint" };
            }
        }
    } catch (e) {
        console.log(e);
    }
}

export const isPresaleActive = async () => {
    try {
        const { ethereum } = window
        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            const BlockHeads = require("./BlockHeads.json");
            const nftContract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                BlockHeads.abi,
                signer
            )
            var isPresaleActive = false;
            try {
                isPresaleActive = await nftContract.isPresaleStarted();
                return isPresaleActive;
            }
            catch (e) {
                console.log(e);
            }
            return isPresaleActive;
        }
    } catch (u) {
        console.log(u);
    }
}

export const isPublicsaleActive = async () => {
    try {
        const { ethereum } = window
        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            const BlockHeads = require("./BlockHeads.json");
            const nftContract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                BlockHeads.abi,
                signer
            )
            var isPublicsaleActive = false;
            try {
                isPublicsaleActive = await nftContract.isPublicsaleStarted();
                return isPublicsaleActive;
            }
            catch (e) {
                console.log(e);
            }
            return isPublicsaleActive;
        }
    } catch (u) {
        console.log(u);
    }
}

export const claimNft = async (tokenAmount, timestamp, signature, address) => {
    try {
        const { ethereum } = window
        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            const BlockHeads = require("./BlockHeads.json");
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                BlockHeads.abi,
                signer
            )

            let e;
            try {
                e = await contract.estimateGas.claim(tokenAmount, timestamp, signature, {
                    from: address
                });
                console.log('gasFee :', e);
            } catch (u) {
                console.log('error: ', u);
                return { success: false, type: 'estimategas' }
            }
            let d = await provider.getGasPrice();
            console.log('getGasPrice :', d)
            let nftTx;
            let tx;
            try {
                nftTx = await contract.claim(tokenAmount, timestamp, signature, {
                    from: address,
                    gasLimit: parseInt(e),
                    gasPrice: parseInt(1.2 * d),
                    // value: correctPrice * tokenAmount,
                    maxFeePerGas: null,
                });
                tx = await nftTx.wait()
                console.log('mintStatus: ', tx)
            } catch (u) {
                return { success: false, type: "claim" };
            }

            if (tx.status == 1) {
                return { success: true, type: "claim" };
            } else {
                return { success: false, type: "claim" };
            }

        }
    } catch (e) {
        console.log(e);
    }
}

export const isAirdropActive = async () => {
    try {
        const { ethereum } = window
        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            const BlockHeads = require("./BlockHeads.json");
            console.log('signer: ', signer._address)
            console.log('provider: ', provider)
            const nftContract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                BlockHeads.abi,
                signer
            )
            console.log('nftContract: ', nftContract)
            var isAirdropActive = false;
            try {
                isAirdropActive = await nftContract.isAirdropStarted();
                return isAirdropActive;
            }
            catch (e) {
                console.log('Error :', e);
            }
            return isAirdropActive;
        }
    } catch (u) {
        console.log('error: ', u);
    }
}