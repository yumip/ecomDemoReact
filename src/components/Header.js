import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useStateValue } from '../contexts/StateProvider';
import { Search } from "@material-ui/icons";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import amazonLogo from '../assets/amazon-logo-white-768x232.png';
import { auth } from '../firebase';
import { useNumOfItems } from '../hooks/useBasket';

const HeaderStyles = styled.div`
  min-height: 100px;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas: "logo nav" "search search";
  align-items: center;
  background-color: var(--dark-blue);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 10px 10px 10px;

  .logo {
    width: 100px;
    object-fit: contain;
    margin-top: 13px;
    margin-bottom: 7px;
  }

  .search {
    grid-area: search;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: white;

    .searchInput {
      height: 12px;
      padding: 10px;
      border: none;
      width: 100%;
      background-color: transparent;
    }
    .searchIcon {
      padding: 5px;
      height: 22px;
      background-color: var(--orange-1);
      border-radius: 5px;
    }
  }

  .nav {
    display: flex;
    justify-content: flex-end;

    a {
      text-decoration: none;

      .option {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        margin-right: 10px;
        color: white;

        .optionLineOne {
          font-size: 10px;
        }

        .optionLineTwo {
          font-size: 13px;
          font-weight: 800;
        }
      }

      .optionBasket {
        display: flex;
        height: 100%;
        align-items: center;
        color: white;
        margin-left: 10px;

        .basketCount {
          margin-left: 5px;
          margin-right: 5px;
        }
      }
    }
  }

  @media (min-width: 768px) {
    min-height: 60px;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "logo search nav";
    padding: 0 20px;
    grid-gap: 20px;
  
    .nav {
      justify-content: space-evenly;
    }
  }
`;


function Header() {

  const [{ user }] = useStateValue();
  const numOfItems = useNumOfItems();

  function handleAuthentication() {
    if (user) {
      auth.signOut();
    }
  }
  
  return (
    <HeaderStyles>
      <Link to="/">
        <img
          className="logo"
          src={amazonLogo}
          alt="Amazon logo"
        />
      </Link>
      <div className="search">
        <input className="searchInput" type="text" />
        <Search className="searchIcon" />
      </div>
      <div className="nav">
        <Link to={!user? "/login" : "/"}>
          <div onClick={handleAuthentication} className="option">
            <span className="optionLineOne">Hello {user? user.email : 'Guest'}</span>
            <span className="optionLineTwo">
              {user? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="option">
            <span className="optionLineOne">Returns</span>
            <span className="optionLineTwo">& Orders</span>
          </div>
        </Link>
        <Link to="/checkout">
          <div className="optionBasket">
            <ShoppingCartIcon />
            <span className="optionLineTwo basketCount">{numOfItems}</span>
          </div>
        </Link>
      </div>
    </HeaderStyles>
  );
}

export default Header;

