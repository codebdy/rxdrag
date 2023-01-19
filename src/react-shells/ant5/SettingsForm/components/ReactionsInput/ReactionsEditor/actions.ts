export type Action =
 | { type: 'ADD' }
 | { type: 'CREATE', create: object }
 | { type: 'DELETE', id: string };