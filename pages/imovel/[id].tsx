import fs from "fs";
import { ReactElement } from "react";
import Layout from "../../components/Layout";
import { IProperty } from "../busca";

interface PropertyParams {
  params: {
    id: string;
  };
}

interface PropertyProps {
  property: IProperty;
}

export async function getStaticPaths() {
  let rawdata = fs.readFileSync(`${process.cwd()}/imoveis.json`, "utf8");
  let properties: IProperty[] = JSON.parse(rawdata);
  const paths = properties.map(({ id }: IProperty) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: PropertyParams) {
  let rawdata = fs.readFileSync(`${process.cwd()}/imoveis.json`, "utf8");
  let properties: IProperty[] = JSON.parse(rawdata);
  const property = properties.find(
    ({ id }: IProperty) => id.toString() === params.id
  );
  return {
    props: {
      property,
    },
  };
}

export default function Property({ property }: PropertyProps) {
  return (
    <section className="main-section">
      {property.id} - {property.streetName}
    </section>
  );
}

Property.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
