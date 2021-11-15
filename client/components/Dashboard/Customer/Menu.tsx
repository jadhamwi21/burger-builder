import React from "react";
import MenuList from "./MenuList";
import MenuToggler from "./MenuToggler";

const Menu = () => {
	return (
		<React.Fragment>
			<MenuToggler />
			<MenuList />
		</React.Fragment>
	);
};

export default Menu;
