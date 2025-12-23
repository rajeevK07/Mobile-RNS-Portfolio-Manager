import { gql } from '@apollo/client';

/**
 * GraphQL Query to fetch domains owned by a specific wallet.
 * * @param $ownerId - The wallet address (must be lowercase Bytes)
 * @returns List of domains with their name and expiration date.
 */
export const GET_DOMAINS_BY_OWNER = gql`
  query GetDomainsByOwner($ownerId: Bytes!) {
    domains(where: { owner: $ownerId }) {
      id
      name
      expiration
    }
  }
`;