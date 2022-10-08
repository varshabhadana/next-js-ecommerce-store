import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import { getPlanter } from '../database/connect';

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
        {props.cart
          .map((el) => {
            return (
              props.planters.find((item) => item.id === el.id).price * el.count
            );
          })
          .reduce((el, sum) => el + sum, 0)}
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
            name="firstName"
            data-test-id="checkout-first-name"
            value={contactInfo.firstName}
            onChange={(event) => {
              setContactInfo({
                ...contactInfo,
                firstName: event.currentTarget.value,
              });
            }}
            required
          />
          <br />
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            data-test-id="checkout-last-name"
            value={contactInfo.lastName}
            onChange={(event) => {
              setContactInfo({
                ...contactInfo,
                lastName: event.currentTarget.value,
              });
            }}
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            data-test-id="checkout-email"
            type="email"
            value={contactInfo.email}
            onChange={(event) => {
              setContactInfo({
                ...contactInfo,
                email: event.currentTarget.value,
              });
            }}
            required
          />
          <br />
          <label htmlFor="address">Address</label>
          <input
            name="address"
            data-test-id="checkout-address"
            value={contactInfo.address}
            onChange={(event) => {
              setContactInfo({
                ...contactInfo,
                address: event.currentTarget.value,
              });
            }}
            required
          />
          <br />
          <label htmlFor="city">City</label>
          <input
            name="city"
            data-test-id="checkout-city"
            value={contactInfo.city}
            onChange={(event) => {
              setContactInfo({
                ...contactInfo,
                city: event.currentTarget.value,
              });
            }}
            required
          />
          <br />
          <label htmlFor="postalCode">Postal Code</label>
          <input
            name="postalCode"
            data-test-id="checkout-postal-code"
            value={contactInfo.postalCode}
            onChange={(event) => {
              setContactInfo({
                ...contactInfo,
                postalCode: event.currentTarget.value,
              });
            }}
            required
          />
          <br />
          <label htmlFor="country">Country</label>
          <input
            name="country"
            data-test-id="checkout-country"
            value={contactInfo.country}
            onChange={(event) => {
              setContactInfo({
                ...contactInfo,
                country: event.currentTarget.value,
              });
            }}
            required
          />
          <br />
          <label htmlFor="creditCard">Credit Card</label>
          <input
            name="creditCard"
            type="number"
            data-test-id="checkout-credit-card"
            value={contactInfo.creditCard}
            onChange={(event) => {
              setContactInfo({
                ...contactInfo,
                creditCard: event.currentTarget.value,
              });
            }}
            required
          />
          <br />
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            name="expirationDate"
            type="date"
            data-test-id="checkout-expiration-date"
            value={contactInfo.expirationDate}
            onChange={(event) => {
              setContactInfo({
                ...contactInfo,
                expirationDate: event.currentTarget.value,
              });
            }}
            required
          />
          <br />
          <label htmlFor="securityCode">Security Code</label>
          <input
            name="securityCode"
            type="password"
            maxLength="3"
            data-test-id="checkout-security-code"
            value={contactInfo.securityCode}
            onChange={(event) => {
              setContactInfo({
                ...contactInfo,
                securityCode: event.currentTarget.value,
              });
            }}
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
