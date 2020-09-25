import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

// const styles = StyleSheet.create({
//   separator: {
//     height: 10,
//   },
// });

const Dropdown = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu style={{zIndex: 999}}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {}} title="Newest repositories" />
          <Menu.Item onPress={() => {}} title="Highest rated repositories" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Lowest rated repositories" />
        </Menu>
      </View>
    </Provider>
  );
};

export default Dropdown;