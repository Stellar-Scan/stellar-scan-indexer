export type NetworkName = 'testnet' | 'mainnet' | 'futurenet';

export const NETWORK_RPC: Record<NetworkName, string> = {
  testnet: 'https://soroban-testnet.stellar.org',
  mainnet: 'https://soroban-mainnet.stellar.org',
  futurenet: 'https://rpc-futurenet.stellar.org',
};

export function rpcFor(network: NetworkName): string {
  return NETWORK_RPC[network];
}
