import axios from 'axios';
import React, { useEffect, useState } from 'react';

type User = {
  id: number;
  username: string;
  address: string;
};

// const DummyUser = {
//   id: 0,
//   username: 'ゲスト',
//   address: 'ネブカドネザル号',
// };

const UserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const fetchJSON = async () => {
    const res = await axios.get('http://localhost:8000/users/1');
    return res.data;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user: User = await fetchJSON();
      setUser(user);
    };
    fetchUser();
  }, []);
  return (
    <div>
      {user ? (
        <div>
          <p>こんにちは、{user.username}さん！</p>{' '}
          <p>やることあったら書いて〜</p>
          <p>最近{user.address}はどう？？</p>
        </div>
      ) : null}
    </div>
  );
};

export default UserInfo;
