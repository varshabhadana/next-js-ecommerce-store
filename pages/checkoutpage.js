import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import { getPlanter } from '../database/planters';

const totalStyles = css`
  font-size: 20px;
  font-weight: bold;
`;
const formStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px;

  width: 700px;
`;
const buttonStyles = css`
  padding: 10px;
  background-color: white;
  color: black;
  border: 2px solid #e7e7e7;
  font-size: 16px;
  margin-top: 30px;

  &:hover {
    background-color: #bfd8bd;
  }
`;
export default function Checkout(props) {
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    creditCard: '',
    expirationDate: '',
    securityCode: '',
  });
  function handleChange(event) {
    setContactInfo({
      ...contactInfo,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  }
  return (
    <>
      <Head>
        <title>Checkout Page</title>
        <meta
          name="description"
          content="Allows you to confirm order by entering shipping and payment information "
        />
      </Head>
      <div css={totalStyles}>
        AMOUNT PAYABLE :
        <span data-test-id="amount-payable">
          {props.cart
            .map((el) => {
              return (
                props.planters.find((item) => item.id === el.id).price *
                el.count
              );
            })
            .reduce((el, sum) => el + sum, 0)}
        </span>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          window.location.href = '/thankyou';
          setContactInfo('');
          props.setCart([]);
        }}
      >
        <div css={formStyles}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            data-test-id="checkout-first-name"
            value={contactInfo.firstName}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            id="lastName"
            data-test-id="checkout-last-name"
            value={contactInfo.lastName}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            data-test-id="checkout-email"
            type="email"
            value={contactInfo.email}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="address">Address</label>
          <input
            name="address"
            id="address"
            data-test-id="checkout-address"
            value={contactInfo.address}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="city">City</label>
          <input
            name="city"
            id="city"
            data-test-id="checkout-city"
            value={contactInfo.city}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="postalCode">Postal Code</label>
          <input
            name="postalCode"
            id="postalCode"
            data-test-id="checkout-postal-code"
            value={contactInfo.postalCode}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="country">Country</label>
          <input
            name="country"
            id="country"
            data-test-id="checkout-country"
            value={contactInfo.country}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="creditCard">Credit Card</label>
          <input
            name="creditCard"
            id="creditCard"
            type="number"
            data-test-id="checkout-credit-card"
            value={contactInfo.creditCard}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            name="expirationDate"
            id="expirationDate"
            data-test-id="checkout-expiration-date"
            value={contactInfo.expirationDate}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="securityCode">Security Code</label>
          <input
            name="securityCode"
            id="securityCode"
            type="password"
            maxLength="3"
            data-test-id="checkout-security-code"
            value={contactInfo.securityCode}
            onChange={handleChange}
            required
          />
        </div>
        <button data-test-id="checkout-confirm-order" css={buttonStyles}>
          Confirm Order
        </button>
      </form>
    </>
  );
}

export async function getServerSideProps() {
  // getting data from the database
  const databasePlanters = await getPlanter();
  return {
    props: {
      planters: databasePlanters,
    },
  };
}
