[![TDD Approved](https://img.shields.io/badge/TDD-Approved-green.svg)]()
# Enzyme Drivers

### Say What??

Enzyme Drivers is a libraray which will make your [enzyme](https://github.com/airbnb/enzyme) based tests to be a lot cleaner and orginized.

### But, Why??

[Enzyme](https://github.com/airbnb/enzyme) is a great tool for writing react based component tests. However, there is a lot of bolier plate involved. Especialy in the react native world where you can't render anything that is related to react native. Every react native based component must be mocked.

So what can you do? **Enzyme Drivers** to the resuce.

Enzyme Drivers introduce a new way of orginizing your enzyme tests. Well, it's not really new. Test drivers have been with us for a long time now and we like them a lot.

Think about it as a cool way to orginize your tests and make them more readable than ever.
Want to know how? keep reading.

## How

First, let's install:
```shell
npm install enzyme-drivers --save-dev
```

Now, let's look at some examples:

Let's say you have this react native component:
```jsx
export default function DummyReactNativeComponent({text, onTap}) {
  return (
    <View>
      <Text testID="myText">Some Text</Text>
      <Text testID="textFromProp" onPress={onTap}>{text}</Text>
    </View>
  );
}
```

Now let's test it:

```jsx
it('should render component', () => {
  //given
  driver.render({text: 'It works!'});

  //then
  expect(driver.text).toBe('It works!');
});
```

Looks neat right? The test is very readable and clear. Now let's write the driver

```jsx
// setup the driver in the beforeEach
beforeEach(() => {
  driver = new MyDriver({
    //the path is relative to the src/ folder (you can change it if you need. see api section)
    path: 'components/dummy-react-native-component',
    mocks: {},
  });
});

//The driver extends the React Native Driver. We also support regular react with BaseDriver
class MyDriver extends RNDriver {
  get text() {
    return this.childrenOf('textFromProp');
  }

  tap() {
    this.tapOn('textFromProp');
  }
}
```

That's it. now checkout the full [api.](#api)

## API

For a better looking API check out our tests ;)


| Method      | Parameters      | Comment                                                                                                                                                                                                                                                                                                                                                     |
|-------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| constructor | options: object | **path**: string relative path from the project root/src folder <br> **mocks**: object - set of key / value.<br> The key is the import you want to mock and the value is the mocked value<br> **isRelativePathFromRoot**: boolean / optional / default to true<br> **rootFolder**: string / optional / default to 'src/' |
| byId        | testId: string  | returns enzyme element by testID property                                                                                                                                                                                                                                                                                                                   |
| childrenOf  | testId: string  | returns .props().children of the given element                                                                                                                                                                                                                                                                                                              |
| propsOf     | testId: string  | returns .props() of the given element                                                                                                                                                                                                                                                                                                                       |
| tapOn       | testId: string  | react native only: simulate press on the given element                                                                                                                                                                                                                                                                                                      |
| stylesById  | testId: string  | react native only: returns a merged object of all of the styles on the given element                                                                                                                                                                                                                                                                        |











