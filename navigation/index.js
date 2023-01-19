// app-wide navigation for all states
import React, { useState, useEffect } from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
import axios from 'axios';

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <UserStack user={user} /> : <AuthStack />;
}