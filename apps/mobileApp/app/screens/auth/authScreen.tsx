import { observer } from "mobx-react-lite";
import { Text, TextInput, View } from "react-native";
import { useStore } from "../../../stores";
import { LoadingButton } from "../../sharedComponents/loadingButton/loadingButton";
import authStyles from "./authScreen.style";
import CodeInput from "./components/codeInput/emailCodeInput";

function AuthScreen() {
  const { authFormStore } = useStore();
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Авторизация</Text>
      <View style={authStyles.formContainer}>
        {!authFormStore.isCodeSend && (
          <>
            <Text style={authStyles.formText}>Введите ваш Email</Text>
            <TextInput
              style={authStyles.input}
              placeholder="Email"
              value={authFormStore.email}
              onChangeText={authFormStore.setEmail}
            />
          </>
        )}
        {!authFormStore.isCodeSend && (
          <LoadingButton
            title="Отправить код доступа"
            onPress={authFormStore.sendEmailCode}
            isLoading={authFormStore.isCodeProcessSending}
            disabled={authFormStore.isSendButtonCodeDisabled}
          />
        )}
        {authFormStore.isCodeSend && (
          <View style={authStyles.emailCodeContainer}>
            <Text style={authStyles.emailCodeTitle}>
              Введите одноразовый код доступа
            </Text>
            <CodeInput
              length={6}
              onComplete={authFormStore.login}
              code={authFormStore.code}
              setCode={authFormStore.setCode}
              autoFocus={true}
              cellStyle={{
                borderColor: authFormStore.errorMessage ? "#FF3B30" : "#E0E0E0",
                backgroundColor: authFormStore.errorMessage
                  ? "#FFF5F5"
                  : "#FFFFFF",
              }}
              cellStyleFilled={{
                borderColor: authFormStore.errorMessage ? "#FF3B30" : "#007AFF",
              }}
            />
            <LoadingButton
              title="Войти"
              onPress={authFormStore.login}
              isLoading={authFormStore.isCodeProcessSending}
              disabled={authFormStore.isSendButtonCodeDisabled}
            />
          </View>
        )}
        <Text style={authStyles.formText}>{authFormStore.errorMessage}</Text>
      </View>
    </View>
  );
}

export default observer(AuthScreen);
