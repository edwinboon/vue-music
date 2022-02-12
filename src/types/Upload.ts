import { firebase } from '../includes/firebase'

export interface Upload {
  task: firebase.storage.UploadTask;
  currentProgress: number;
  name: string;
  variant: string;
  icon: string;
  textClass: string;
}