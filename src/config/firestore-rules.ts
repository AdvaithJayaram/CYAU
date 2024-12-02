export const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function hasRole(role) {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role;
    }
    
    function isAdmin() {
      return hasRole('admin');
    }
    
    function isConnected(userId) {
      return exists(/databases/$(database)/documents/connections/$(request.auth.uid + '_' + userId));
    }

    // User profiles
    match /users/{userId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn() && isOwner(userId);
      allow update: if isSignedIn() && (isOwner(userId) || isAdmin());
      allow delete: if isAdmin();
    }

    // Posts
    match /posts/{postId} {
      allow read: if isSignedIn() && (
        resource.data.visibility == 'public' ||
        (resource.data.visibility == 'connections' && isConnected(resource.data.authorId)) ||
        isOwner(resource.data.authorId)
      );
      allow create: if isSignedIn();
      allow update: if isSignedIn() && (isOwner(resource.data.authorId) || isAdmin());
      allow delete: if isSignedIn() && (isOwner(resource.data.authorId) || isAdmin());
    }

    // Deals
    match /deals/{dealId} {
      allow read: if isSignedIn() && (
        resource.data.visibility == 'public' ||
        resource.data.participants[request.auth.uid] != null ||
        isOwner(resource.data.owner)
      );
      allow create: if isSignedIn();
      allow update: if isSignedIn() && (
        isOwner(resource.data.owner) ||
        resource.data.participants[request.auth.uid].role in ['lead', 'admin']
      );
      allow delete: if isSignedIn() && isOwner(resource.data.owner);
    }

    // Live Rooms
    match /liveRooms/{roomId} {
      allow read: if isSignedIn() && (
        resource.data.visibility == 'public' ||
        resource.data.participants[request.auth.uid] != null ||
        isOwner(resource.data.host)
      );
      allow create: if isSignedIn();
      allow update: if isSignedIn() && (
        isOwner(resource.data.host) ||
        resource.data.participants[request.auth.uid].role == 'host'
      );
      allow delete: if isSignedIn() && isOwner(resource.data.host);
    }

    // Documents
    match /documents/{documentId} {
      allow read: if isSignedIn() && (
        resource.data.access.type == 'public' ||
        request.auth.uid in resource.data.access.users ||
        resource.data.uploadedBy == request.auth.uid
      );
      allow create: if isSignedIn();
      allow update: if isSignedIn() && (
        resource.data.uploadedBy == request.auth.uid ||
        isAdmin()
      );
      allow delete: if isSignedIn() && (
        resource.data.uploadedBy == request.auth.uid ||
        isAdmin()
      );
    }

    // Comments
    match /comments/{commentId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isSignedIn() && (
        resource.data.authorId == request.auth.uid ||
        isAdmin()
      );
      allow delete: if isSignedIn() && (
        resource.data.authorId == request.auth.uid ||
        isAdmin()
      );
    }

    // Connections
    match /connections/{connectionId} {
      allow read: if isSignedIn() && (
        resource.data.userId == request.auth.uid ||
        resource.data.connectedWith == request.auth.uid
      );
      allow create: if isSignedIn() && (
        request.resource.data.userId == request.auth.uid
      );
      allow update: if isSignedIn() && (
        resource.data.userId == request.auth.uid ||
        resource.data.connectedWith == request.auth.uid
      );
      allow delete: if isSignedIn() && (
        resource.data.userId == request.auth.uid ||
        resource.data.connectedWith == request.auth.uid
      );
    }

    // Activities
    match /activities/{activityId} {
      allow read: if isSignedIn() && (
        resource.data.userId == request.auth.uid ||
        isAdmin()
      );
      allow create: if isSignedIn();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
  }
}`;