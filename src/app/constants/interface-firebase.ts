import { DocumentChangeType, DocumentReference, SnapshotMetadata, DocumentData } from "firebase/firestore";

export interface DocumentChangeAction {
    //'added' | 'modified' | 'removed';
    type: DocumentChangeType;
    payload: DocumentSnapshot;
  }
  
  export interface DocumentChange {
    type: DocumentChangeType;
    doc: DocumentSnapshot;
    oldIndex: number;
    newIndex: number;
  }
  
  export interface DocumentSnapshot {
    exists: boolean,
    ref: DocumentReference,
    id: string,
    metadata: SnapshotMetadata,
    data(): DocumentData,
    get(fieldPath: string): any,
  }