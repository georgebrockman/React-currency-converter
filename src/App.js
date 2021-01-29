import React, { useState, useEffect } from 'react';
import './App.css';
import  axios  from "./components/converterAPI";
// import CustomSelect from "./components/CustomSelect";
import { currencies } from "./components/DropDown";
import { Layout, Avatar, InputNumber, Select, Card, Button, Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';

const API_BASE_URL = "https://api.exchangeratesapi.io";

// psuedo
// need drop down list of currencies
// drop down list


function App() {
  const [fromCurrency, setFromCurrency] = useState(0);
  const [toCurrency, setToCurrency] = useState(1);
  const [exchangeRate, setExchange] = useState(0.0);
  const [amount, setAmount] = useState(0.0);
  const [newAmount, setNewAmount] = useState(0.0);
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    getExchange()
  },[])
  // fromAmount needs to be entered

  // let fromAmount, toAmount
  // newAmount {
  //   fromAmount = amount
  //   toAmount = amount * exchangerate
  // };
  console.log(exchangeRate)
  const getExchange = (index) => {
    console.log(currencies, fromCurrency, toCurrency)
    if (fromCurrency != null && toCurrency != null) {
      axios.get(`/latest?symbols=${currencies[fromCurrency].label},${currencies[toCurrency].label}`)
      .then((response= response.json())=>{
        console.log(response, toCurrency)
        console.log(response.data.rates[currencies[toCurrency].label])
        var exchange = parseFloat(response.data.rates[currencies[toCurrency].label])
        setExchange(exchange)
        if (index && index===0) {
          setAmount(parseFloat(newAmount / exchange))
        }
        else if (index && index ===1) {
          setNewAmount(parseFloat(amount * exchange))
        }

        // if (var input = parseFloat(amount)) {
        //   setNewAmount(input * response.data.rates[currencies[toCurrency].label])
        // };
        // else {
        //   setAmount(input / response.data.rates[currencies[toCurrency].label])
        // };
      })
    };
  };

  const { Option } = Select;

// function calculateExchange() {
//   setAmount(v.target.value) * getExchange.map()
// }

// add two cards for each currency
// change button to ant Design
// Convert button and reverse button

// Old custom select approach, now updated with ant design select.
// <CustomSelect style={{ display: "inline-block", color: '#72BDA3'}} title="Original Currency" value={fromCurrency} onChange={(v) => setFromCurrency(v)} options={currencies} />
// <InputNumber style={{ display: "inline-block", }}size="large" min={1} max={100000} value={amount} onChange={onChange} />
// <CustomSelect style={{ display: "inline-block", color: '#72BDA3'}} title="New Currency" value={toCurrency} onChange={(v) => setToCurrency(v)} options={currencies} />
// <InputNumber style={{ display: "inline-block", }}size="large" min={1} max={100000} value={newAmount} />

function onChange(value) {
    setAmount(value);
    if (exchangeRate != 0.0) {
      setNewAmount(parseFloat(value * exchangeRate))
    }
    console.log('changed', value);
};

function onChangeNewAmount(value) {
    setNewAmount(value);
    if (exchangeRate != 0.0) {
      setAmount(parseFloat(value / exchangeRate))
    }
    console.log('changed', value);
};

// function handleChange(value) {
//   console.log(`selected ${value}`);
// }

var DisplayOptions = currencies.map((currency, i ) => {
  return (
    <Option key={i} value = { currency.id } >{currency.label}</Option>
  )
})

  return (
      <div className="AppName">
        <hd1> George's Currency Converter React App </hd1>
          <div className="App">
            <Layout style={{color: 'blue'}}>
              <header style={{backgroundColor: '#72BDA3', height: '5vh'}}>
                <Avatar style={{float: 'right'}} src='./dp.jpg' />
                <Title style={{color: 'white'}} level={12} >Currency Converter</Title>
              </header>
              <Layout>
                <div>
                  <div className="currency-card">
                    <Row justify='center' gutter={16}>
                      <Col span={8}>
                        <Card title="From Currency" bordered={false} style={{ width: '100%', display: "inline-block" }}>
                          <Select defaultValue={fromCurrency} style={{ width: 120 }} onChange={ v => {
                            setFromCurrency(v)
                            console.log(v)
                            getExchange(0)
                          }}>
                            {DisplayOptions}
                          </Select>
                          <InputNumber style={{ display: "inline-block", }}size="medium" min={0} max={100000000000000000} value={amount} onChange={onChange} />
                        </Card>
                      </Col>
                      <Col span={8}>
                        <Card title="New Currency" bordered={false} style={{ width: '100%', display: "inline-block" }}>
                          <Select defaultValue={toCurrency} style={{ width: 120 }} onChange={ v => {
                            setToCurrency(v)
                            console.log(v)
                            getExchange(1)
                          }}>
                            {DisplayOptions}
                          </Select>
                          <InputNumber style={{ display: "inline-block", }}size="medium" min={0} max={100000000000000000} value={newAmount} onChange={onChangeNewAmount}/>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Layout>
            </Layout>
          </div>
      </div>
  );
}

export default App;
