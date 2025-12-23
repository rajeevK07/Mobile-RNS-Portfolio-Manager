// src/services/RnsService.ts
import { ethers, Contract, BrowserProvider } from 'ethers';
import { ROOTSTOCK_TESTNET } from '../constants/chains';

// The "Phone Book" Address (Testnet Registry)
const RNS_REGISTRY_ADDRESS = '0x7d284aaac6e925aad802a53c0c69efe3764597b8'; 

export class RnsService {
  provider: ethers.JsonRpcProvider;
  registryContract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(ROOTSTOCK_TESTNET.rpcUrl);
    // Connect to the Registry Contract
    this.registryContract = new Contract(
        RNS_REGISTRY_ADDRESS, 
        ['function resolver(bytes32 node) view returns (address)'], 
        this.provider
    );
  }

  // "Who is 0x123...?" (Reverse Resolution)
  async lookupAddress(address: string): Promise<string | null> {
    try {
      return await this.provider.lookupAddress(address);
    } catch (error) {
      return null;
    }
  }

  // We need 3 things: The domain name, the new owner's address, and the "Signer" (the authorized wallet)
async transferDomain(domainName: string, newOwner: string, provider: BrowserProvider) {
  try {
      // 1. Get the Signer from the Provider
      // This is like asking the user: "Can I borrow your pen?"
      const signer = await provider.getSigner();

      // 2. Re-connect the contract with the Signer
      // The contract was "View Only" before. Now it's "Writeable".
      const rnsWithSigner = new Contract(
          RNS_REGISTRY_ADDRESS,
          ['function setOwner(bytes32 node, address owner)'], // The ABI for changing ownership
          signer
      );

      // 3. Calculate the "Namehash" (The ID of the domain)
      // RNS doesn't understand "alice.rsk". It understands a massive hash number.
      const node = ethers.namehash(domainName);

      // 4. Send the Transaction (The "Certified Letter")
      console.log(`Transferring ${domainName} to ${newOwner}...`);
      const tx = await rnsWithSigner.setOwner(node, newOwner);

      // 5. Wait for the Receipt
      // We wait for 1 confirmation (1 block) to ensure it's "in the mailbox".
      console.log("Transaction sent! Hash:", tx.hash);
      await tx.wait(1);

      return tx.hash;

  } catch (error) {
      // This usually happens if the user clicks "Reject" in their wallet
      console.error("Transfer failed:", error);
      throw error;
  }
}
}

export const rnsService = new RnsService();
