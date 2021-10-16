import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
export interface CryptocurrenciesProps {
  simplified?: boolean;
}

const Cryptocurrencies = ({ simplified = false }: CryptocurrenciesProps) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isLoading } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(cryptos);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency: any) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency?.id}
          >
            <Link to={`/crypto/${currency?.id}`}>
              <Card
                title={`${currency?.rank}. ${currency?.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency?.iconUrl}
                    alt="coin icon"
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency?.price)}</p>
                <p>Market Cap: {millify(currency?.marketCap)}</p>
                <p>Daily Change: {millify(currency?.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
