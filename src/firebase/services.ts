import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { IRoute } from '../interfaces/IRoute';

import { db } from './db';

const COLLECTION_NAME = 'routes';

const routesCollectionRef = collection(db, COLLECTION_NAME);

const getRouteDoc = (routeId: string) => doc(db, COLLECTION_NAME, routeId);

export const getRoutes = async () => {
  const data = await getDocs(routesCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const createRoute = async (route: IRoute) => {
  await addDoc(routesCollectionRef, route);
};

export const toggleFavorite = async (routeId: string, isFavorite: boolean) => {
  const routeDoc = getRouteDoc(routeId);
  await updateDoc(routeDoc, { isFavorite: !isFavorite });
};

export const removeRoute = async (routeId: string) => {
  const routeDoc = getRouteDoc(routeId);
  await deleteDoc(routeDoc);
};