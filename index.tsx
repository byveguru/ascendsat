import { registerRootComponent } from 'expo';
import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { PostHogProvider } from 'posthog-react-native';

import App from './App';
import { posthog } from './src/config/posthog';

// Catches render-time crashes (e.g. a stale timer/listener firing long after
// the user went idle or backgrounded the tab) so the app recovers with a
// reload button instead of going blank with no way back in.
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('App crashed, showing recovery screen:', error, info);
    try { posthog.capture('app_crashed', { message: error?.message }); } catch (e) {}
  }
  handleReload = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.reload();
    } else {
      this.setState({ hasError: false });
    }
  };
  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, backgroundColor: '#0b1020', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 10, textAlign: 'center' }}>
            Something went wrong
          </Text>
          <Text style={{ color: '#9aa4c7', fontSize: 14, textAlign: 'center', marginBottom: 24 }}>
            Your progress is saved. Tap below to reload AscendSAT.
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: '#2563eb', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10 }}
            onPress={this.handleReload}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Reload</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

function Root() {
  return (
    <PostHogProvider
      client={posthog}
      autocapture={{
        captureScreens: false,
        captureTouches: true,
        propsToCapture: ['testID'],
      }}
    >
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </PostHogProvider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Root);
