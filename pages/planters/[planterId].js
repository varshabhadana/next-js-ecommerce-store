import Image from 'next/image';
import { planters } from '../../database/planters';

export default function Plannter(props) {
  return (
    <div>
      <div key={props.planter.id}>
        <h2>{props.planter.name}</h2>
        <Image
          src={`/${props.planter.id}-${props.planter.name.toLowerCase()}.jpeg`}
          alt=""
          width="400"
          height="400"
        />
        <div>Material:{props.planter.material}</div>
        <div>
          Image Name: {props.planter.id}-{props.planter.name.toLowerCase()}.jpeg
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  // Retrieve the animal ID from the URL
  const planterId = parseInt(context.query.planterId);

  const foundPlanter = planters.find((el) => el.id === planterId);
  return {
    props: {
      planter: foundPlanter,
    },
  };
}
