<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import { auth, db } from '$lib/firebase.js';
	import { goto } from '$app/navigation';
	import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

	const provider = new GoogleAuthProvider();
	const login = async () => {
		try {
			const { user } = await signInWithPopup(auth, provider);
			const idToken = await user.getIdToken();
			console.log('🚀 ~ file: +page.svelte:11 ~ login ~ idToken:', idToken);
			await fetch('/login', {
				method: 'POST',
				body: JSON.stringify(idToken)
			});
			const userDocRef = doc(db, 'users', user.uid);
			const userDocSnap = await getDoc(userDocRef);
			if (!userDocSnap.exists()) {
				await setDoc(
					doc(db, 'users', user.uid),
					{
						name: user.displayName,
						email: user.email,
						profilePic: user.photoURL
					},
					{
						merge: true
					}
				);
			}

			goto('/');
		} catch (error) {
			console.log(error);
		}
	};
	const logOut = async () => {
		await signOut(auth);
		await fetch('/login', {
			method: 'DELETE'
		});
	};
</script>

<div class="flex items-center h-screen gap-5 w-screen border justify-center">
	<Button on:click={login}>login with google</Button>
	<Button on:click={logOut}>signout</Button>
	<Button href="/">home</Button>
	<Button href="/post/jshjsj">post</Button>
</div>
