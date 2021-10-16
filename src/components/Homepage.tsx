import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import { Cryptocurrencies, News } from "./";

const { Title } = Typography;

const Homepage = () => {
  const { data, isLoading } = useGetCryptosQuery(10);
  console.log(data);
  const globalStats = data?.data?.stats;

  return (
    <>
      {isLoading ? (
        <p>"Loading ..."</p>
      ) : (
        <>
          <Title level={2} className="heading">
            Global Crypto Stats
          </Title>
          <Row>
            <Col span={12}>
              <Statistic
                title="Total Cryptocurrencies"
                value={globalStats?.total}
              />
              <Statistic
                title="Total Exchanges"
                value={millify(globalStats?.totalExchanges)}
              />
              <Statistic
                title="Total Market Cap"
                value={millify(globalStats?.totalMarketCap)}
              />
              <Statistic
                title="Total 24h Volume"
                value={millify(globalStats?.total24hVolume)}
              />
              <Statistic
                title="Total Market"
                value={millify(globalStats?.totalMarkets)}
              />
            </Col>
          </Row>
          <div className="home-heading-container">
            <Title level={2} className="home-title">
              Top 10 Cryptocurrencies
            </Title>
            <Title level={3} className="show-more">
              <Link to="/cryptocurrencies">Show More</Link>
            </Title>
          </div>
          <Cryptocurrencies simplified={true} />
          <div className="home-heading-container">
            <Title level={2} className="home-title">
              Latest Crypto News
            </Title>
            <Title level={3} className="show-more">
              <Link to="/news">Show More</Link>
            </Title>
          </div>
          <News simplified={true} />
        </>
      )}
    </>
  );
};

export default Homepage;
