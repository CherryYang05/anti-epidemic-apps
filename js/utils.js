module.exports = {
  handleData(result, defaultDate) {
    // console.log(result,defaultDate)
    let res = [];
    // console.log(result)
    for (let item of (result)) {
      // console.log(item)
      let { name, en_name } = getTextName(defaultDate, item);
      if (name) {
        let data = item;
        let cities = [];
        if (data.cities.length < 1) {
          cities.push({
            cityName: data.provinceShortName,
            confirmedCount: data.confirmedCount,
            curedCount: data.curedCount,
            deadCount: data.deadCount,
            locationId: data.locationId,
            suspectedCount: data.suspectedCount
          });
        } else {
          cities = data.cities;
        }
        res.push({
          name,
          key: en_name,
          value: data.confirmedCount,
          cities: cities
        });
      }
    }
    return res;
  },
  handleworldData(result, defaultDate) {
    // console.log(result,defaultDate)
    let res = {
      asian:{
        name:'亚洲',
        cities:[]
      },
      europe:{
        name:'欧洲',
        cities:[]
      },
      na:{
        name:'北美洲',
        cities:[]
      },
      sa:{
        name:'南美洲',
        cities:[]
      },
      africa:{
        name:'非洲',
        cities:[]
      },
      oceania:{
        name:'大洋洲',
        cities:[]
      },
    };
    // console.log(result)
    for (let item of (result)) {
       //console.log(item)
      let { name, en_name } = getTextName(defaultDate, item);
      //console.log(name)
      if(name=='北美洲'){
        res.na.cities.push({
          cityName: item.provinceName,
          confirmedCount: item.confirmedCount,
          curedCount: item.curedCount,
          deadCount: item.deadCount,
          locationId: item.locationId,
          suspectedCount:item.suspectedCount
        });
      }
      else if(name=='南美洲'){
        res.sa.cities.push({
          cityName: item.provinceName,
          confirmedCount: item.confirmedCount,
          curedCount: item.curedCount,
          deadCount: item.deadCount,
          locationId: item.locationId,
          suspectedCount:item.suspectedCount
        });
      }
      else if(name=='欧洲'){
        res.europe.cities.push({
          cityName: item.provinceName,
          confirmedCount: item.confirmedCount,
          curedCount: item.curedCount,
          deadCount: item.deadCount,
          locationId: item.locationId,
          suspectedCount:item.suspectedCount
        });
      }
      else if(name=='亚洲'){
        res.asian.cities.push({
          cityName: item.provinceName,
          confirmedCount: item.confirmedCount,
          curedCount: item.curedCount,
          deadCount: item.deadCount,
          locationId: item.locationId,
          suspectedCount:item.suspectedCount
        });
      }
      else if(name=='大洋洲'){
        res.oceania.cities.push({
          cityName: item.provinceName,
          confirmedCount: item.confirmedCount,
          curedCount: item.curedCount,
          deadCount: item.deadCount,
          locationId: item.locationId,
          suspectedCount:item.suspectedCount
        });
      }else {
        res.africa.cities.push({
          cityName: item.provinceName,
          confirmedCount: item.confirmedCount,
          curedCount: item.curedCount,
          deadCount: item.deadCount,
          locationId: item.locationId,
          suspectedCount:item.suspectedCount
        });
      }
      
    }
    console.log(res)
    return res;
  },
  async httpGet(tableName) {
    let MyTableObject = new wx.BaaS.TableObject(tableName);
    return await MyTableObject.count().then(async res => {
      return await MyTableObject.offset(res - 1)
        .find()
        .then(res => {
          return res.data.objects.pop();
        });
    });
  }
};

function getTextName(defaultDate, data) {
  for (let item of defaultDate) {
    // console.log(data.provinceShortName, item.name)
    if (data.provinceShortName === item.name||data.continents === item.name) {
      // console.log(item)

      return {
        name: `${item.name}`,
        en_name: item.en_name
      };
    }
  }
  return false;
}
