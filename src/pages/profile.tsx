import { useState } from 'react';

import Settings from 'components/profile/settings';
import Show from 'components/profile/show';

function Profile() {
  const [onSetting, setOnSetting] = useState(false);

  return (
    <div>
      {onSetting ? <Settings setOnSetting={setOnSetting} /> : <Show setOnSetting={setOnSetting} />}
    </div>
  );
}

export default Profile;
