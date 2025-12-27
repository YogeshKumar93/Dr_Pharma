import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  InputAdornment
} from "@mui/material";

import {
  Close,
  RadioButtonChecked,
  RadioButtonUnchecked,
  ArrowRightAlt,
  Lock,
  QrCodeScanner,
  CreditCard as CardIcon,
  AccountBalance as BankIcon,
  Wallet,
  MonetizationOn,
  Payment as PaymentIcon
} from "@mui/icons-material";

const OnlinePayment = ({
  open,
  onClose,
  cartItems,
  cartTotal,

  paymentOptions,
  onlinePaymentMethod,
  setOnlinePaymentMethod,
  setPaymentMethod,

  cardNumber,
  setCardNumber,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,

  upiId,
  setUpiId,

  selectedBank,
  setSelectedBank,

  selectedWallet,
  setSelectedWallet,

  handlePaymentSubmit
}) => {
  const handlePaymentSelect = (methodId) => {
    setOnlinePaymentMethod(methodId);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2, maxHeight: "90vh" } }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#f8f9fa",
          color: "#1A5276",
          borderBottom: "1px solid #e0e0e0"
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600}>Select Payment Method</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Grid container>
          {/* LEFT SIDE */}
          <Grid item xs={12} md={8} sx={{ p: 3 }}>
            <Typography fontWeight={600} mb={2}>
              Another payment method
            </Typography>

            <List>
              {paymentOptions
                .filter((opt) => opt.id !== "cod")
                .map((option) => (
                  <Paper
                    key={option.id}
                    sx={{
                      mb: 2,
                      border: `1px solid ${
                        onlinePaymentMethod === option.id
                          ? "#1A5276"
                          : "#e0e0e0"
                      }`
                    }}
                  >
                    <ListItem
                      button
                      onClick={() => !option.disabled && handlePaymentSelect(option.id)}
                      disabled={option.disabled}
                    >
                      <ListItemIcon>
                        {onlinePaymentMethod === option.id ? (
                          <RadioButtonChecked sx={{ color: "#1A5276" }} />
                        ) : (
                          <RadioButtonUnchecked />
                        )}
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography fontWeight={600}>
                            {option.name}
                          </Typography>
                        }
                        secondary={option.description}
                      />
                      {onlinePaymentMethod === option.id && (
                        <ArrowRightAlt sx={{ color: "#1A5276" }} />
                      )}
                    </ListItem>

                    {/* CARD */}
                    {option.id === "card" &&
                      onlinePaymentMethod === "card" && (
                        <Box p={2}>
                          <TextField
                            fullWidth
                            label="Card Number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CardIcon />
                                </InputAdornment>
                              )
                            }}
                            sx={{ mb: 2 }}
                          />
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                label="Expiry"
                                value={expiryDate}
                                onChange={(e) =>
                                  setExpiryDate(e.target.value)
                                }
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                label="CVV"
                                type="password"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      )}

                    {/* UPI */}
                    {option.id === "upi" &&
                      onlinePaymentMethod === "upi" && (
                        <Box p={2}>
                          <TextField
                            fullWidth
                            label="UPI ID"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                        </Box>
                      )}

                    {/* NET BANKING */}
                    {option.id === "netbanking" &&
                      onlinePaymentMethod === "netbanking" && (
                        <Box p={2}>
                          {option.banks.map((bank) => (
                            <Button
                              key={bank}
                              fullWidth
                              sx={{ mb: 1 }}
                              variant={
                                selectedBank === bank
                                  ? "contained"
                                  : "outlined"
                              }
                              onClick={() => setSelectedBank(bank)}
                            >
                              {bank}
                            </Button>
                          ))}
                        </Box>
                      )}

                    {/* WALLET */}
                    {option.id === "wallet" &&
                      onlinePaymentMethod === "wallet" && (
                        <Box p={2}>
                          {option.wallets.map((wallet) => (
                            <Button
                              key={wallet}
                              fullWidth
                              sx={{ mb: 1 }}
                              variant={
                                selectedWallet === wallet
                                  ? "contained"
                                  : "outlined"
                              }
                              onClick={() => setSelectedWallet(wallet)}
                            >
                              {wallet}
                            </Button>
                          ))}
                        </Box>
                      )}
                  </Paper>
                ))}
            </List>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ bgcolor: "#f8f9fa", p: 3 }}
          >
            <Typography fontWeight={600} mb={2}>
              Order Summary
            </Typography>

            {cartItems.map((item) => (
              <Box
                key={item.id}
                display="flex"
                justifyContent="space-between"
                mb={1}
              >
                <Typography variant="body2">
                  {item.name} x {item.qty}
                </Typography>
                <Typography fontWeight={600}>
                  ₹{(item.price * item.qty).toFixed(2)}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">
              Total: ₹{cartTotal.toFixed(2)}
            </Typography>

            <Box mt={2} display="flex" alignItems="center" gap={1}>
              <Lock fontSize="small" />
              <Typography variant="caption">
                Secure payment
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            setPaymentMethod("online");
            handlePaymentSubmit();
          }}
        >
          Use this payment method
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OnlinePayment;
