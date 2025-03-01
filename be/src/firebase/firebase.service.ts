/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FirebaseService {
  constructor() {
    const serviceAccountPath = path.resolve(
      process.cwd(),
      'src/lib/firebase/firebase-admin.json',
    );

    if (!fs.existsSync(serviceAccountPath)) {
      throw new Error(
        `Firebase credential file not found: ${serviceAccountPath}`,
      );
    }

    const serviceAccount = require(serviceAccountPath);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  async sendNotification(
    token: string,
    id: number,
    title: string,
    body: string,
  ) {
    const message = {
      notification: { title, body },
      data: { id: id.toString() },
      token,
    };

    try {
      await admin.messaging().send(message);
      console.log('✅ Push Notification sent successfully!');
    } catch (error) {
      console.error('❌ Error sending push notification:', error);
    }
  }
}
