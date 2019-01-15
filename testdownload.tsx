import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

class TestDownload extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      fooState: {} // fooState is not being used but for testing purpose
    };
  }

  componentWillMount() {
    this.getFooData();
  }

  getFooData() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        this.setState({ ...this.state, fooState: json }); // it works if comment out
      });
  }

  render() {
    const styles = StyleSheet.create({
      toolbar: {
        padding: 20
      },
      page: {
        padding: 30
      }
    });

    const MyDoc = () => (
      <Document>
        <Page orientation="landscape" size="A4" style={styles.page}>
          <View>
            <Text>
              This is a test.
            </Text>
          </View>
        </Page>
      </Document>
    );

    return (
      <div>
        <div style={styles.toolbar}>
          {/* it works if comment out, from here */}
          <PDFDownloadLink document={<MyDoc />} fileName="mydoc.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>
          {/* it works if comment out, until here */}
        </div>
        <div>
          <MyDoc />
        </div>
      </div>
    );
  }
}

export default TestDownload;
